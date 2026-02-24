import { useEffect, useState } from "react";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

export function Updater() {
    const { t } = useTranslation();
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [updateVersion, setUpdateVersion] = useState("");
    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);

    useEffect(() => {
        checkForUpdates();
    }, []);

    async function checkForUpdates() {
        try {
            const update = await check();
            if (update?.available) {
                setUpdateAvailable(true);
                setUpdateVersion(update.version);
            }
        } catch (error) {
            console.error("Failed to check for updates:", error);
        }
    }

    async function downloadAndInstall() {
        try {
            setDownloading(true);
            const update = await check();

            if (!update?.available) {
                setDownloading(false);
                return;
            }

            await update.downloadAndInstall((event) => {
                switch (event.event) {
                    case "Started":
                        setDownloadProgress(0);
                        break;
                    case "Progress":
                        setDownloadProgress(
                            Math.round((event.data.chunkLength / 1024) * 100)
                        );
                        break;
                    case "Finished":
                        setDownloadProgress(100);
                        break;
                }
            });

            await relaunch();
        } catch (error) {
            console.error("Failed to download and install update:", error);
            setDownloading(false);
        }
    }

    if (!updateAvailable) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 bg-background border rounded-lg shadow-lg p-4 max-w-sm">
            <div className="flex flex-col gap-3">
                <div>
                    <h3 className="font-semibold text-sm">
                        {t("updater.title", "Update Available")}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        {t("updater.version", `Version ${updateVersion} is available`)}
                    </p>
                </div>

                {downloading && (
                    <div className="space-y-1">
                        <div className="w-full bg-secondary rounded-full h-2">
                            <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${downloadProgress}%` }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                            {downloadProgress}%
                        </p>
                    </div>
                )}

                <div className="flex gap-2">
                    <Button
                        onClick={downloadAndInstall}
                        disabled={downloading}
                        size="sm"
                        className="flex-1"
                    >
                        {downloading
                            ? t("updater.downloading", "Downloading...")
                            : t("updater.install", "Install")}
                    </Button>
                    <Button
                        onClick={() => setUpdateAvailable(false)}
                        disabled={downloading}
                        variant="outline"
                        size="sm"
                    >
                        {t("updater.later", "Later")}
                    </Button>
                </div>
            </div>
        </div>
    );
}

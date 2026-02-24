import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UpdaterTest() {
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);

    const simulateDownload = () => {
        setDownloading(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setDownloadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setDownloading(false);
                setUpdateAvailable(false);
            }
        }, 300);
    };

    if (!updateAvailable) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <h1 className="text-2xl font-bold">Updater UI Test</h1>
                <Button onClick={() => setUpdateAvailable(true)}>
                    Show Update Notification
                </Button>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <h1 className="text-2xl font-bold">Updater UI Test</h1>
                <p className="text-muted-foreground">
                    Check bottom-right corner for update notification
                </p>
            </div>

            <div className="fixed bottom-4 right-4 bg-background border rounded-lg shadow-lg p-4 max-w-sm">
                <div className="flex flex-col gap-3">
                    <div>
                        <h3 className="font-semibold text-sm">Update Available</h3>
                        <p className="text-xs text-muted-foreground">
                            Version 0.3.0 is available
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
                            onClick={simulateDownload}
                            disabled={downloading}
                            size="sm"
                            className="flex-1"
                        >
                            {downloading ? "Downloading..." : "Install"}
                        </Button>
                        <Button
                            onClick={() => setUpdateAvailable(false)}
                            disabled={downloading}
                            variant="outline"
                            size="sm"
                        >
                            Later
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

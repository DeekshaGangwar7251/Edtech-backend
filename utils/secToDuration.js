function convertSecondsToDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");

    if (hours > 0) {
        return `${hours}h ${paddedMinutes}m ${paddedSeconds}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${paddedSeconds}s`;
    } else {
        return `${seconds}s`;
    }
}

module.exports = { convertSecondsToDuration };
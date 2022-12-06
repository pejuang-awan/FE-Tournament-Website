export default function dayCalculator(date){
    const ONE_DAY = 1000 * 60 * 60 * 24;

    const date1 = new Date();
    const date2 = new Date(date);

    const differenceMs = date2 - date1;
    const daysBetween = Math.round(differenceMs / ONE_DAY);

    if (daysBetween < 0) {
        return "Sudah Tutup";
    } else {
        return daysBetween.toString() + "hari";
    }
}
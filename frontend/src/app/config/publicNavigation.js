export function getPublicNavigation(t) {
    return [
        { path: "/product", label: t("common.product") },
        { path: "/intelligence", label: t("common.intelligenceNav") },
        { path: "/how-it-works", label: t("common.how") },
        { path: "/about", label: t("common.about") },
        { path: "/contact", label: t("common.contact") },
    ];
}
export function getPublicTitles(t) {
    return {
        "/": t("navigation.homeTitle"), "/product": t("common.product"), "/how-it-works": t("common.how"),
        "/about": t("common.about"), "/contact": t("common.contact"), "/documentation": t("navigation.guide"), "/privacy": t("navigation.privacyTitle"), "/terms": t("navigation.termsTitle"),
    };
}

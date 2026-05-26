export const selectPillars = (s) => s.pillars.all;

export const selectPillarsLoading = (s) => s.pillars.status === "loading";

export const selectSelectedPillarIds = (s) => s.pillars.selectedIds;

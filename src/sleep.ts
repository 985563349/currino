export const sleep = (wait: number) => {
  const now = Date.now();

  while (Date.now() - now < wait) {
    // sleep...
  }
};

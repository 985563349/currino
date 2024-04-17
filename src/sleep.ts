export const sleep = (timeout: number) => {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    // sleep...
  }
};

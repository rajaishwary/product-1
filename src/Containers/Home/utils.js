export const runValidation = str => {
  const arr =
    str && str.length
      ? str
          .split(",")
          .map(item => item.trim())
          .filter(Boolean)
      : [];
  let ranges = [],
    nums = [];

  arr.length &&
    arr.forEach(element => {
      if (element.includes("-")) {
        const rangeNums = element
          .trim()
          .split("-")
          .map(i => Number(i));
        ranges.push({ start: rangeNums[0], end: rangeNums[1] });
      } else {
        nums.push(Number(element));
      }
    });
  // dups in nums
  let dupsInNums = [];
  nums.forEach(num => {
    const filtered = nums.filter(i => i === num);
    if (filtered.length > 1) {
      dupsInNums.push(num);
    }
  });
  // dups in ranges
  let dupsInRange = {};
  ranges.length > 0 &&
    ranges.forEach(range => {
      for (let i = range.start; i <= range.end; i++) {
        const numsUnique = [...new Set(nums)];
        if (numsUnique.includes(i)) {
          if (!dupsInRange[`${range.start}-${range.end}`]) {
            dupsInRange[`${range.start}-${range.end}`] = [];
          }
          dupsInRange[`${range.start}-${range.end}`].push(i);
        }
      }
    });

  const result = [...new Set(
  [...new Set(
      ranges.reduce((acc, curr) => {
        for (let i = curr.start; i <= curr.end; i++) {
          acc.push(i);
        }
        return acc;
      }, [])
  )].concat(nums))].sort((a, b) => a - b);
  
  return { dupsInNums, dupsInRange, result };
};

/**
 * @param {string} shengji - 省级。比如：四川省（川、蜀）
 * @param {string} diji - 地级。比如：成都市
 */
const selectJson = async (shengji = null, diji = null) => {
  const url = "http://xzqh.mca.gov.cn/selectJson";
  const bodyArgs = `shengji=${encodeURIComponent(shengji || "")}&diji=${encodeURIComponent(diji || "")}`;
  console.log(`Request: ${url}?${bodyArgs}`);
  
  const response = await fetch(url, {
    body: bodyArgs,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export { selectJson };

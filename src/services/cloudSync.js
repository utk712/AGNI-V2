// Real-time Same-Domain Persistent Cloud Sync Service for AGNI-V2

const PRIMARY_API_ENDPOINT = "/api/store";
const FALLBACK_ENDPOINT = "https://kvdb.io/WfD6wP4F7jB9D3R8Z1V0K/agni_v2_live";

export async function fetchCloudStore() {
  try {
    const res = await fetch(PRIMARY_API_ENDPOINT + "?t=" + Date.now(), {
      method: "GET",
      headers: { "Accept": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object" && (data.products || data.customerOrders)) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Primary API error, fetching fallback", e);
  }

  try {
    const res = await fetch(FALLBACK_ENDPOINT + "?t=" + Date.now(), {
      method: "GET",
      headers: { "Accept": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object" && (data.products || data.customerOrders)) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Fallback endpoint error", e);
  }

  return null;
}

export async function saveCloudStore(fullData) {
  try {
    localStorage.setItem("agni_cloud_backup_v2", JSON.stringify(fullData));
  } catch (e) {
    console.error(e);
  }

  try {
    await fetch(PRIMARY_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullData),
    });
  } catch (e) {
    console.warn("Primary API save error", e);
  }

  try {
    await fetch(FALLBACK_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullData),
    });
  } catch (e) {
    console.warn("Fallback save error", e);
  }
}

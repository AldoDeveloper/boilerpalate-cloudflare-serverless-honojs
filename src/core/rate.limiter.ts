export async function rateLimitKV(env: Cloudflare.Env, key: string, limit = 10, window = 60) {
  
  const date = new Date();
  const now = date.getTime();

  const data = await env.kv_app_cv.get(key, "json") as {
    count: number;
    reset: number;
  } | null;


  if(!data){
    await env.kv_app_cv.put(
        key,
        JSON.stringify({ count: 1, reset: now + (window * 1000) })
    )

    return { success: true, reamining: limit - 1 }
  }

  if(data && now >= data.reset){
    await env.kv_app_cv.put(
      key,
      JSON.stringify({ count: 1, reset: now + (window * 1000) }),
      { expirationTtl: window }
    );
    return { success: false, remaining: limit - 1 };
  }


  if (data.count >= limit && data.reset > now) {
    return { success: false, remaining: 0 };
  }

  // increment
  await env.kv_app_cv.put(
    key,
    JSON.stringify({ ...data, count: data.count + 1}),
    { expirationTtl: data.reset - now }
  );

  return {
    success: true,
    remaining: limit - (data.count + 1),
  };
}
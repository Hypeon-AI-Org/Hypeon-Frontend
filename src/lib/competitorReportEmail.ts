export function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

/** Derive a short display name from a competitor website URL (e.g. photowall.com → Photowall). */
export function hostnameToDisplayName(websiteUrl: string): string {
  try {
    const u = new URL(websiteUrl);
    const host = u.hostname.replace(/^www\./i, '');
    const first = host.split('.')[0] || host;
    if (!first) return 'Competitor';
    return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  } catch {
    return 'Competitor';
  }
}

export type CompetitorReportTemplateOpts = {
  competitorName: string;
  reportImageUrl: string;
  signupUrl: string;
  facebookPageUrl: string;
};

export function buildCompetitorReportHtml(opts: CompetitorReportTemplateOpts): string {
  const { competitorName, reportImageUrl, signupUrl, facebookPageUrl } = opts;
  const name = escapeHtml(competitorName);
  const img = escapeHtml(reportImageUrl);
  const signup = signupUrl.trim();
  const fb = facebookPageUrl.trim();

  const signupBlock =
    signup.length > 0
      ? `<p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;">
          If you would like to see the full report, feel free to create an account here and pick a 3-day free trial:
          <a href="${escapeHtml(signup)}" style="color:#2563eb;text-decoration:underline;">${escapeHtml(signup)}</a>
        </p>`
      : `<p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;">
          If you would like to see the full report, sign in to the Hypeon app and open your workspace to continue.
        </p>`;

  const facebookBlock =
    fb.length > 0
      ? `<p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;">
          Then copy paste their Facebook page URL:
          <a href="${escapeHtml(fb)}" style="color:#2563eb;text-decoration:underline;">${escapeHtml(fb)}</a>
          and paste it under <strong>Insights</strong> → <strong>add followed page</strong>. Once you add it there, you will be able to see the entire report.
        </p>`
      : `<p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;">
          Then find their Facebook Page in the app and add it under <strong>Insights</strong> → <strong>add followed page</strong>. Once you add it there, you will be able to see the entire report.
        </p>`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hypeon — competitor report</title>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ffffff;">
      <tr>
        <td style="padding:20px 24px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#111827;">
          <p style="margin:0 0 16px 0;">Hi there,</p>
          <p style="margin:0 0 16px 0;">
            Thanks for the submission on Hypeon’s website! We have generated a report of
            <strong>${name}</strong> :
          </p>
         
          ${signupBlock}
          ${facebookBlock}
          <p style="margin:0 0 16px 0;">Please let me know if you have any questions!</p>
          <p style="margin:0 0 4px 0;">Warm regards,</p>
          <p style="margin:0;font-weight:bold;">Yash Kumar</p>
          <p style="margin:0 0 24px 0;">Hypeon AI</p>
          <p style="margin:0;font-size:12px;line-height:1.5;color:#6b7280;">
            You’re receiving this because someone requested a competitor report using this email address on our site.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

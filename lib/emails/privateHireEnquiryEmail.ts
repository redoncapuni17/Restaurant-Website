type PrivateHireEnquiryEmailData = {
  fullName: string;
  email: string;
  phone: string;
  newsletter: boolean;
  diningStyle: string;
  preferredDate: string;
  preferredTime: string;
  guests: string;
  budget: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function detailRow(label: string, value: string, last = false) {
  const border = last ? "" : "border-bottom: 1px solid #E8D4B8;";
  return `
    <tr>
      <td style="padding: 14px 0; ${border} width: 38%; vertical-align: top;">
        <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #7A6352;">
          ${label}
        </p>
      </td>
      <td style="padding: 14px 0; ${border} vertical-align: top;">
        <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; line-height: 1.45; color: #3D2A1F;">
          ${value}
        </p>
      </td>
    </tr>
  `;
}

export function buildPrivateHireEnquiryEmail(data: PrivateHireEnquiryEmailData) {
  const fullName = escapeHtml(data.fullName);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone || "—");
  const diningStyle = escapeHtml(data.diningStyle);
  const preferredDate = escapeHtml(data.preferredDate);
  const preferredTime = escapeHtml(data.preferredTime || "—");
  const guests = escapeHtml(data.guests);
  const budget = escapeHtml(data.budget);
  const message = escapeHtml(data.message).replace(/\n/g, "<br />");
  const newsletter = data.newsletter ? "Yes" : "No";

  const text = [
    "PUPA RESTAURANT & BAR — Private Hire Enquiry",
    "",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Newsletter: ${newsletter}`,
    `Dining style: ${data.diningStyle}`,
    `Preferred date: ${data.preferredDate}`,
    `Preferred time: ${data.preferredTime || "—"}`,
    `Guests: ${data.guests}`,
    `Budget per person: ${data.budget}`,
    "",
    "Message:",
    data.message,
    "",
    "37 Turner Street, Manchester M4 1DW",
    "0161 400 4830 · info@puparestaurant.com",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Private Hire Enquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5DEC4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F5DEC4; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #FBF0E4; border: 1px solid #E8D4B8;">

          <!-- Top brand bar -->
          <tr>
            <td style="background-color: #3D2A1F; padding: 10px 0; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 36px 40px 28px; text-align: center; background-color: #FBF0E4;">
              <p style="margin: 0 0 12px; font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase; color: #B8956C;">
                Pupa Restaurant &amp; Bar
              </p>
              <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 32px; line-height: 1.15; font-weight: 600; color: #3D2A1F;">
                Private Hire Enquiry
              </h1>
              <p style="margin: 14px 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; font-style: italic; color: #8F6B45;">
                A new celebration request has arrived
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 18px auto 0;">
                <tr>
                  <td style="width: 36px; border-top: 1px solid #B8956C;">&nbsp;</td>
                  <td style="width: 10px; text-align: center;">
                    <span style="display: inline-block; width: 6px; height: 6px; border: 1px solid #B8956C; transform: rotate(45deg);"></span>
                  </td>
                  <td style="width: 36px; border-top: 1px solid #B8956C;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Intro strip -->
          <tr>
            <td style="padding: 0 40px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F3E0C8; border: 1px solid #E8D4B8;">
                <tr>
                  <td style="padding: 18px 22px;">
                    <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #7A6352;">
                      From
                    </p>
                    <p style="margin: 6px 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 20px; color: #3D2A1F; font-weight: 600;">
                      ${fullName}
                    </p>
                    <p style="margin: 4px 0 0; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #7A6352;">
                      <a href="mailto:${email}" style="color: #8F6B45; text-decoration: none;">${email}</a>
                      ${data.phone ? ` · ${phone}` : ""}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding: 24px 40px 8px;">
              <p style="margin: 0 0 8px; font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: #B8956C;">
                Event details
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${detailRow("Dining style", diningStyle)}
                ${detailRow("Preferred date", preferredDate)}
                ${detailRow("Preferred time", preferredTime)}
                ${detailRow("Guests", guests)}
                ${detailRow("Budget / person", budget)}
                ${detailRow("Newsletter", newsletter, true)}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 16px 40px 32px;">
              <p style="margin: 0 0 10px; font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: #B8956C;">
                Message
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; border: 1px solid #E8D4B8;">
                <tr>
                  <td style="padding: 20px 22px;">
                    <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; line-height: 1.65; color: #3D2A1F;">
                      ${message}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td align="center" style="padding: 0 40px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color: #3D2A1F; border-radius: 2px;">
                    <a href="mailto:${email}?subject=${encodeURIComponent(`Re: Private Hire Enquiry — ${data.fullName}`)}"
                       style="display: inline-block; padding: 14px 28px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #FBF0E4; text-decoration: none;">
                      Reply to guest
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #3D2A1F; padding: 28px 40px; text-align: center;">
              <p style="margin: 0 0 6px; font-family: Georgia, 'Times New Roman', serif; font-size: 18px; color: #FBF0E4; letter-spacing: 0.06em;">
                Pupa Restaurant &amp; Bar
              </p>
              <p style="margin: 0 0 12px; font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #B8956C;">
                Mediterranean Charcoal Grill
              </p>
              <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.7; color: #E8D4B8;">
                37 Turner Street, Manchester M4 1DW<br />
                0161 400 4830 · info@puparestaurant.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { html, text };
}

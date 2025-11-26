export abstract class BaseEmailContentGenerator {
    generateHeader(): string {
        return `
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 0;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; width: 100%; padding: 0 20px;">
                        <tr>
                            <td align="center" style="padding: 20px 0;">
                                <h1 style="margin: 0; font-size: 32px; font-weight: 900; color: #ffffff; letter-spacing: -1px;">
                                    Gym Management System
                                </h1>
                                <p style="margin: 8px 0 0; font-size: 16px; color: #94a3b8;">
                                    Membership • Workouts • Payments • Reports
                                </p>
                                <div style="margin-top: 20px; height: 4px; width: 80px; background: linear-gradient(90deg, #ef4444, #f97316); border-radius: 2px; margin-left: auto; margin-right: auto;"></div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>`;
    }

    generateFooter(): string {
        return `
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #0f172a; padding: 40px 0; margin-top: 40px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; width: 100%;">
                        <tr>
                            <td align="center" style="padding: 0 20px;">
                                <p style="color: #64748b; font-size: 14px; margin: 0 0 12px;">
                                    © 2025 Gym Management System. All rights reserved.
                                </p>
                                <p style="margin: 0; font-size: 13px; color: #475569;">
                                    <a href="#" style="color: #f97316; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                                    <span style="color: #475569;">|</span>
                                    <a href="#" style="color: #f97316; text-decoration: none; margin: 0 10px;">Terms</a>
                                    <span style="color: #475569;">|</span>
                                    <a href="#" style="color: #f97316; text-decoration: none; margin: 0 10px;">Support</a>
                                </p>
                                <p style="margin: 20px 0 0; font-size: 12px; color: #94a3b8;">
                                    <a href="#" style="color: #64748b; text-decoration: underline;">Unsubscribe</a> • 
                                    <a href="#" style="color: #64748b; text-decoration: underline;">Preferences</a>
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>`;
    }

    htmlWrapper(body: string): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gym Management System</title>
    <style>
        body { margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, Helvetica, sans-serif; }
        @media only screen and (max-width: 600px) {
            table[class="container"] { width: 100% !important; padding: 0 20px !important; }
        }
    </style>
</head>
<body style="margin:0; padding:0; background-color:#f8fafc;">
    ${this.generateHeader()}
    
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f8fafc; padding: 30px 0;">
        <tr>
            <td align="center">
                <table width="600" class="container" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08);">
                    <tr>
                        <td style="padding: 40px;">
                            ${body}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    ${this.generateFooter()}
</body>
</html>`;
    }
}
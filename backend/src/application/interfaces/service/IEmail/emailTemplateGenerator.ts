export interface IEmailTemplateGenerator {
    generateHtml(data: Record<string,string>):string;
}
export interface ISendPasswordEmailContentGenerator {
    generateHtml(data: Record<string,string>):string;
}
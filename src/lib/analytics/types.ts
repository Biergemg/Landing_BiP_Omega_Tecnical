export interface AnalyticsConfig {
    measurementId: string;
    debug?: boolean;
}

export interface EventParameters {
    [key: string]: string | number | boolean | undefined;
}

export interface PageViewEvent extends EventParameters {
    page_title?: string;
    page_location?: string;
    page_path?: string;
}
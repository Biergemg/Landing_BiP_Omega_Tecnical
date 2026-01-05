export interface BaseSectionProps {
    id?: string;
    className?: string;
}

export interface ProblemStatementProps extends BaseSectionProps {
    title?: string;
    description?: string;
}

export interface CallToActionProps extends BaseSectionProps {
    heading?: string;
    subheading?: string;
}

export interface HeroProps extends BaseSectionProps {
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    ctaHref?: string;
}

export interface ServicesProps extends BaseSectionProps {
    services?: Array<{
        title: string;
        description: string;
        icon?: string;
    }>;
}

export interface ContactFormProps extends BaseSectionProps {
    recipientEmail?: string;
}
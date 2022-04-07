export interface PageOptions {
    title: string;
    description: string;
}

export interface LayoutProps {
    children: React.ReactNode;
    pageOptions: PageOptions;
}

export interface Question {
    id: string;
    question: string;
    archived: boolean;
    createdAt: string;
    userId: string;
}

export interface Answer {
    id: string;
    answer: string;
    questionId: string;
    createdAt: string;
}
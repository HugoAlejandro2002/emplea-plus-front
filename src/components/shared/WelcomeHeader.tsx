interface WelcomeHeaderProps {
    title: string;
    description: string;
}

const WelcomeHeader = ({ title, description }: WelcomeHeaderProps) => (
    <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary">{title}</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {description}
        </p>
    </div>
);

export default WelcomeHeader;

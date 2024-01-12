
interface AdministrationPageProps {
    params: {userId: string}
};

const AdministrationPage: React.FC<AdministrationPageProps> = async({
    params
}) => {
    return (
        <div className="items-center">
            <div className="flex-1 space-y-4 p-8 pt-6">
                Overview
            </div>
        </div>
    );
}

export default AdministrationPage;
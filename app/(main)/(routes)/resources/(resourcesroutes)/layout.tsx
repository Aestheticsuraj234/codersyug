import { ModalProvider } from "@/components/providers/modal-provider";




const ResourcesLayout = ({ children }: {
    children: React.ReactNode
}) => {

    return (
        <>

            {children}
            <ModalProvider />

        </>
    )
}

export default ResourcesLayout;
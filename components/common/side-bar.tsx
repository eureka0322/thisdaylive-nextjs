interface Props {
    html: string
}

export default function SideBar({html}: Props) {
    return (
        <div className="dynamic-sidebar-item" dangerouslySetInnerHTML={{ __html: html }}>
        </div>
    )
}

interface EditModeTogglerProps {
    onUserAction: () => void
    editMode: boolean
}
// export default function EditModeToggler({ onUserAction, editMode }: EditModeTogglerProps) {

export default function EditModeToggler({ onUserAction }: EditModeTogglerProps) {
    return (
        <div className="editModeTogglerArea">
            {
                // <button type="button" onClick={()=>onUserAction()}>
                //     {editMode ? "View mode" : "Edit mode"}
                // </button>
            }
            <button type="button" onClick={() => onUserAction()} className="btn-icon lg">
                <span className="icon icon-pencil" />
            </button>
        </div>
    )
}

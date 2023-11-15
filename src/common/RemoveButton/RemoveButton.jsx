import './RemoveButton.css'

export const RemoveButton = ({ emit }) => {

    return (
        <div className="remove" onClick={() => emit(path)}>Remove</div>
    )
}
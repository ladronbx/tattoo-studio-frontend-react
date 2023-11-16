import './RemoveButton.css'

export const RemoveButton = ({ remove }) => {

    return (
        <div className="remove" onClick={() => remove()}>Remove</div>
    )
}
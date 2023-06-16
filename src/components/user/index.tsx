function User(props:{onclick:()=>void}):JSX.Element {
  return (
    <div className="logo bg-danger flex-row-center text-light" onClick={props.onclick}>M
    </div>
    
  )
}

export default User
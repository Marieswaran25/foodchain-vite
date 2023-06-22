function User(props: {onclick: () => void}): JSX.Element {
    return (
        <div className='logo bg-danger flex-row-center text-light' onClick={props.onclick} onMouseOver={(e) => (e.currentTarget.style.cursor = 'pointer')}>
            M
        </div>
    );
}

export default User;

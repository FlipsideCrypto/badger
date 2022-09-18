const AddressAvatar = ({ avatar }) => { 
    return <div className="address__avatar" style={{
        backgroundImage: `url(${avatar})`
    }}></div>
}

export default AddressAvatar;
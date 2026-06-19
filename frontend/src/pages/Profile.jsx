export default function Profile(){
    const user=JSON.parse(localStorage.getItem("user"));
    return(
        <div>
            <h1>Profile</h1>
            <p>Name :{user?.fullName} </p>
            <p>Email:{user?.email} </p>
        </div>
    )
}
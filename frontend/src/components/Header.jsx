export default function Header(){
    return(
        <div className="bg-success ">
        <h1>Crop Management portal</h1>
        <div className="row mt-3">
            <div className="col-md-9">
                <h2>Welcome back</h2>
            </div>
            <div className="col-md-3">
                <div className="container mt-2">
            <input type="text" placeholder="search here" style={{width:"300px"}}/>
            </div>
            </div>
            </div>
        </div>

    )
}
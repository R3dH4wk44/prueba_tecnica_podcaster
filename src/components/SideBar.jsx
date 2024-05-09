

export const SideBar = ({ name, author, image, id }) => {


    return (<>
        <div className="w-1/4 h-screen text-center text-white bg-slate-900 flex flex-col justify-center items-center px-5 py-2 gap-5">
            <img src={image} alt="Image of the podcast" className="rounded-full"/>

            <h1>{name}</h1>
            <p>{author}</p>
        </div>
    </>)
}
import Link from "next/link";

interface link {
    id: number,
    name: string,
    link: string
}

export default function Links({ links, id }: { links: link[], id: string }) {
    return (
        <div>
            <h5 className="text-black font-h3 fw-4">{id}</h5>
            <ul className="p-0 m-0 mt-3">
                {links.map((link: link) => (
                    <li key={`${id}_${link.id}`} className="mb-2 link1 w-auto d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" /></svg>
                        <Link href={link.link} className="font-primary fw-3">{link.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
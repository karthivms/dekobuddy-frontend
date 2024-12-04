'use client'

import Image from "next/image";
import Link from "next/link";
import Search from "../icons/search";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ModalProps } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { searchItem } from "@/app/api/searchQuery";




interface MyVerticallyCenteredModalProps extends ModalProps {
    onHide: () => void;

}


interface search {
    id?: number,
    category?: string,
    name: string,
    size?: string,
    image: string,
    slug?: string,
    sku?: string
}


function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [results, setResults] = useState<search[]>([]);
    const [search, setSearch] = useState("");
    const router = useRouter();

    useEffect(() => {
        const debounceTimer = setTimeout(async () => {
            const response = await searchItem(search);
            setResults(response);
        }, 500)

        return () => clearTimeout(debounceTimer);
    }, [search])

    const [selectedIndex, setSelectedIndex] = useState(0);

    const createSlug = useCallback((input: string) => {
        return input.trim().replace(/\s+/g, '-').toLowerCase();
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => (prevIndex + 1) % results.length);
        } else if (event.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) =>
                prevIndex === 0 ? results.length - 1 : prevIndex - 1
            );
        } else if (event.key === 'Enter') {
            const item = results[selectedIndex]

            if (item.slug) {
                router.push(`/category/${item.slug}`);
            } else {
                router.push(`/product/${item.id}/${createSlug(item.name)}/?variation=${item.sku}`);

            }
        }
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setIsFocused(true)
    }


    const toPage = () => {
        setIsFocused(false);
        props.onHide();
        setSearch('');
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='searchpopup'
        >
            <Modal.Header closeButton className='bb-transparent-1 pb-0 '>
             
            </Modal.Header>
            <form>
                <Modal.Body className='pt-3 '>
                    <form className="search-form ms-xl-5 ms-lg-1 ms-0" onSubmit={(e) => e.preventDefault()}>
                        <span className="text-white"><Search /></span>
                        <input
                            type="text"
                            value={search}
                            onKeyDown={handleKeyDown}
                            onChange={handleChange}
                            onFocus={() => setIsFocused(true)}
                            placeholder='Search for Products...'
                            className="bg-theme1 border-transparent-solid br-3 w-100 py-2 text-white font-primary pe-4" />
                        {isFocused && (<>{
                            results.length !== 0 ? (
                                <div onMouseLeave={() => setIsFocused(false)}
                                    onClick={toPage}
                                    className=" w-100 mt-3 max-h-300 overflow-auto custom-scrollbar">
                                    {results.map((item: search, index) => (
                                        <div key={`search_item_${index}`} className={index === selectedIndex ? 'active-item' : 'bg-white'} onMouseOver={() => setSelectedIndex(index)}>
                                            {item.slug ? (
                                                <div className='d-flex align-items-center  gap-20 search-item' >
                                                    <Image alt="cart_images" width={40} height={40} src={item.image} className="br-5" />
                                                    <div>
                                                        <Link href={`/category/${item.slug}`} className="mb-1 fw-3 d-block" >{item.name}</Link>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='d-flex align-items-center gap-20  search-item'>
                                                    <Image alt="cart_images" width={40} height={40} src={item.image} className="br-5" />
                                                    <div>
                                                        <Link href={`/product/${item.id}/${createSlug(item.name)}/?variation=${item.sku}`} className="mb-0 d-block fw-4 font-primary ">{item.name} - {item.size}</Link>
                                                        <span className="font-small d-block text-theme1 fw-4  br-3">in {item.category}</span>
                                                    </div>
                                                </div>)}

                                        </div>
                                    ))}
                                </div>) : (
                                <div className=" p-3  w-100 fw-3 text-theme1" onMouseLeave={() => setIsFocused(false)}>
                                    No results Found
                                </div>
                            )
                        }</>)}
                    </form>
                </Modal.Body>

            </form>
        </Modal>
    );
}

export default function SearchPopup() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>

            <button
                className="btn text-black"
                onClick={() => setModalShow(true)}>
                <Search />
            </button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}

            />
        </div>
    )
}
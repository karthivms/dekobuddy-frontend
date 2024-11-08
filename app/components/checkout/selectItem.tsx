import Form from 'react-bootstrap/Form';
interface country {
    name: string,
}

function Select({ data, handlechange, type }: { data: country[], handlechange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void, type: string }) {
    return (
        <Form.Select aria-label="Default select example" onChange={handlechange} name={type}>
            <option>Select {type}</option>
            {data.map((country) => (
                <option value={country.name}>{country.name}</option>
            ))}
        </Form.Select>
    );
}

export default Select;
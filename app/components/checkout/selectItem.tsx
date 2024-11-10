import Form from 'react-bootstrap/Form';
interface country {
    name: string,
}

function Select({ value , data, handlechange, type }: {value : string, data: country[], handlechange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void, type: string }) {
    return (
        <Form.Select aria-label="Default select example" onChange={handlechange} value={value}  name={type} required>
            <option value="">Select {type}</option>
            {data && data.map((country, index) => (
                <option key={`state_country_${country.name}_${index}`} value={country.name}>{country.name}</option>
            ))}
        </Form.Select>
    );
}

export default Select;
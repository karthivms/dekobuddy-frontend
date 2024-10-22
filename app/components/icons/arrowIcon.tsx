const ArrowIcon = ({ open }: { open: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#868588" style={{ transform: open ? 'rotate(90deg)' : 'rotate(270deg)', transition: 'transform 0.3s ease' }}>
        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
    </svg>
);


export default ArrowIcon;
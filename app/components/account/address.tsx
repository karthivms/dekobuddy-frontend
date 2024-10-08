import More from "../icons/more";

export default function Address() {
    return (
        <div className="border-border-solid p-3">
            <div>
                <div className="d-flex mb-2 justify-content-between text-secondary">
                    <span className="fw-4 font-small  text-uppercase bg-border2 p-1 br-2 d-block w-auto">Home</span>
                    <More />
                </div>
                    <div className="d-inline-block">
                        <span className="fw-4 ">User</span>
                        <span className="font-primary fw-3 ms-3">+91 9876543210</span>
                    </div>
                <span className="font-primary d-block fw-3 d-inline-block mt-2">
                    742, pongalmanagar poolankuruchi, sivagangai(DT), Thiruppathur (TK), poolankuruchi, Nerkuppai, Tamil Nadu
                </span>
            </div>


        </div>
    )
}
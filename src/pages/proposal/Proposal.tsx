import { useNavigate, useParams } from "react-router-dom";
import useProposalStore from "../../store/proposal/proposal.store";
import { useEffect } from "react";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { borderClassByStatus } from "../../helpers/util";

function Proposal() {
  const { userId } = useParams();
  const getProposalsByUserId = useProposalStore(
    (state) => state.getProposalsByUserId
  );
  const proposals = useProposalStore((state) => state.proposals);

  useEffect(() => {
    !!userId && getProposalsByUserId();
  }, [userId]);

  return (
    <section>
      <Panel header="Postulaciones" className="mt-4">
        {proposals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {proposals?.map((proposal) => (
              <Card
                key={proposal._id}
                className={`border ${borderClassByStatus(
                  proposal.status
                )} [&_div]:p-2`}
              >
                <p>
                  <strong className="mr-2">Projecto:</strong>
                  {proposal.nameProject}
                </p>

                <p>
                  <strong className="mr-2">Estado:</strong>
                  {proposal.status}
                </p>
              </Card>
            ))}
          </div>
        )}

        {proposals.length === 0 && (
          <section className="w-full flex flex-col justify-center items-center my-10">
            <h1 className="text-2xl font-bold">No hay postulaciones</h1>
            <p className="text-gray-500">
              Aún no hay postulaciones para este proyecto
            </p>
          </section>
        )}
      </Panel>
    </section>
  );
}

export default Proposal;

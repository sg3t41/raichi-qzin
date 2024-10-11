import { JobCard as Card } from "./components/JobCard/JobCard";
import { JobDetailCard as DetailCard } from "./components/JobDetailCard/JobDetailCard";
import { getAll } from "./libs/getAll/getAll";
import { getById } from "./libs/getById/getById";
export {Card, DetailCard}
export const query = {
    getAll, getById
}
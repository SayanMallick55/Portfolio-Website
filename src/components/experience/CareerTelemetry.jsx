import { journeyAchievements } from '../../data/experience'
export function CareerTelemetry() { return <aside className="career-telemetry" aria-label="Career telemetry"><p>Career telemetry <span>LIVE</span></p><div>{journeyAchievements.map((item) => <span key={item.id} style={{ '--telemetry-color': item.color }}><strong>{item.value}</strong><small>{item.label}</small></span>)}</div></aside> }

import { useParams } from 'react-router-dom'
import Shell from '../components/Shell'

export default function Project() {
  const { slug = '' } = useParams()
  return (
    <Shell crumb={`projects / ${slug}`}>
      <div className="placeholder">[ project: {slug} ]</div>
    </Shell>
  )
}

import Profil from './Profil.jsx'
import GreekColumn from './GreekColumn.jsx'
import GreekFrise from './GreekFrise.jsx'
import ReadyButton from './Button.jsx'

const PlayerSlot = ({ player }) => {
    return (
        <div className="flex flex-col items-center gap-1">
            <Profil size="xs" showBorder={true} />
            <GreekColumn size="xs" />
            <ReadyButton />
        </div>
    )
}

export default PlayerSlot
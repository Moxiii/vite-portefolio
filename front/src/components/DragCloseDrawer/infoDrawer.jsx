import "./infoDrawer.scss"
import { motion , AnimatePresence } from 'motion/react'
export default function DragCloseDrawer({isOpen , onClose , children}) {

  return(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="info-drawer"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", bounce: 0.2 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.y > 100) onClose();
          }}
        >
          <div className="drawer-header">
            <div className="grab"/>
          </div>
          <div className="drawer-content">

          {children}
          </div>
        </motion.div>
      )}

    </AnimatePresence>

  )
}
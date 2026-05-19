import { Element4, PlayCircle } from 'iconsax-react'
import type { WorkspaceCategory } from '../../pages/workspace/mockItems'
import './CategoryCard.css'

function CategoryCard({ category }: { category: WorkspaceCategory }) {
  return (
    <article className="ws-cat-card">
      <div className="ws-cat-card__thumb">
        <div className="ws-cat-card__blur" style={{ background: category.thumbnailGradient }} aria-hidden="true" />
        <div className="ws-cat-card__inner" style={{ background: category.thumbnailGradient }} />
      </div>
      <div className="ws-cat-card__info">
        <h3 className="ws-cat-card__title">{category.name}</h3>
        <div className="ws-cat-card__meta">
          <span className="ws-cat-card__metaitem">
            <Element4 size={20} color="var(--text-secondary)" variant="Linear" />
            <span>{category.courseCount} courses</span>
          </span>
          <span className="ws-cat-card__metaitem">
            <PlayCircle size={16} color="var(--text-secondary)" variant="Linear" />
            <span>{category.lessonCount} lessons</span>
          </span>
        </div>
      </div>
    </article>
  )
}

export default CategoryCard

import React, { useContext } from 'react'
import { Checkbox } from 'vtex.styleguide'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import classNames from 'classnames'

import SettingsContext from './SettingsContext'

const CSS_HANDLES = ['filterItem']

// These are used to prevent creating a <Checkbox /> with id equal
// to any of these words.
const reservedVariableNames = [
  'global',
  'window',
  'document',
  'self',
  'screen',
  'parent',
]

const FacetItem = ({
  navigateToFacet,
  facetTitle,
  facet,
  className,
  preventRouteChange,
}) => {
  const { showFacetQuantity } = useContext(SettingsContext)
  const handles = useCssHandles(CSS_HANDLES)
  const classes = classNames(
    applyModifiers(handles.filterItem, facet.value),
    { [`${handles.filterItem}--selected`]: facet.selected },
    className,
    'lh-copy w-100'
  )

  const checkBoxId = reservedVariableNames.includes(facet.value)
    ? `filterItem--${facet.key}-${facet.value}`
    : `${facet.key}-${facet.value}`

  return (
    <div
      className={classes}
      style={{ hyphens: 'auto', wordBreak: 'break-word' }}
    >
      <Checkbox
        id={checkBoxId}
        checked={facet.selected}
        label={
          showFacetQuantity ? `${facet.name} (${facet.quantity})` : facet.name
        }
        name={facet.name}
        onChange={() =>
          navigateToFacet({ ...facet, title: facetTitle }, preventRouteChange)
        }
        value={facet.name}
      />
    </div>
  )
}

export default FacetItem

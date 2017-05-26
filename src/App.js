import React, { Component } from 'react';
import { Grid, Navbar, Jumbotron, Button } from 'react-bootstrap';
import { extend } from 'lodash'
import { SearchkitManager,SearchkitProvider,
  SearchBox, RefinementListFilter, Pagination,
  HierarchicalMenuFilter, HitsStats, SortingSelector, NoHits,
  ResetFilters, RangeFilter, NumericRefinementListFilter,
  ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
  InputFilter, GroupedSelectedFilters,
  Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar } from 'searchkit'
import './index.css'

const host = "http://data.jitsejan.com/persons/"
const searchkit = new SearchkitManager(host)

const MovieHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  const source:any = extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <img data-qa="image" alt="presentation" className={bemBlocks.item("image")} src={result._source.image} width="170" height="240"/>
      <div data-qa="name" className={bemBlocks.item("name")} dangerouslySetInnerHTML={{__html:source.name}}></div>
      <div data-qa="description" className={bemBlocks.item("description")} dangerouslySetInnerHTML={{__html:source.description}}></div>
    </div>
  )
}

const MovieHitsListItem = (props)=> {
  const {bemBlocks, result} = props
  const source:any = extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <img data-qa="image" alt="presentation" className={bemBlocks.item("image")} src={result._source.picture} width="170" height="240"/>
      <div data-qa="name" className={bemBlocks.item("name")} dangerouslySetInnerHTML={{__html:source.name}}></div>
      <div data-qa="color" className={bemBlocks.item("color")} dangerouslySetInnerHTML={{__html:source.color}}></div>
      <div data-qa="occupation" className={bemBlocks.item("occupation")} dangerouslySetInnerHTML={{__html:source.occupation}}></div>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
            <div className="my-logo">Searchkit Ëxample</div>
            <SearchBox autofocus={true} searchOnChange={true} prefixQueryFields={["name^1","occupation^2", "image^1"]}/>
          </TopBar>

        <LayoutBody>

          <SideBar>
          </SideBar>
          <LayoutResults>
            <ActionBar>
              <ActionBarRow>
                <HitsStats translations={{
                  "hitstats.results_found":"{hitCount} results found"
                }}/>
                <ViewSwitcherToggle/>
              </ActionBarRow>

              <ActionBarRow>
                <GroupedSelectedFilters/>
                <ResetFilters/>
              </ActionBarRow>

            </ActionBar>
            <ViewSwitcherHits
                hitsPerPage={12} highlightFields={["name","occupation"]}
                sourceFilter={["name", "occupation", "color", "image", "description"]}
                hitComponents={[
                  {key:"grid", title:"Grid", itemComponent:MovieHitsGridItem, defaultOption:true},
                  {key:"list", title:"List", itemComponent:MovieHitsListItem}
                ]}
                scrollTo="body"
            />
            <NoHits suggestionsField={"name"}/>
            <Pagination showNumbers={true}/>
          </LayoutResults>

          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default App;

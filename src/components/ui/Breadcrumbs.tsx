import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';

import { partnerUniversities, arcadiaMajors } from '@/data/engineering-paths';

import { GraphViewState, ExtendedGraphNode, generateBreadcrumbs, getConnectedMajorIds } from '@/lib/graph-utils';import { partnerUniversities, arcadiaMajors } from '@/data/engineering-paths';



interface BreadcrumbsProps {import { GraphViewState, ExtendedGraphNode, generateBreadcrumbs, getConnectedMajorIds } from '@/lib/graph-utils';import { partnerUniversities, arcadiaMajors } from '@/data/engineering-paths';

  viewState: GraphViewState;

  allNodes: Map<string, ExtendedGraphNode>;

  onNavigateHome: () => void;

  onSelectUniversity: (universityId: string) => void;interface BreadcrumbsProps {import { GraphViewState, ExtendedGraphNode, generateBreadcrumbs, getConnectedMajorIds } from '@/lib/graph-utils';import { partnerUniversities, arcadiaMajors } from '@/data/engineering-paths';import React, { useState } from 'react';

  onSelectMajor: (majorId: string, universityId?: string) => void;

  onSwitchUniversity: (newUniversityId: string, currentMajorId?: string) => void;  viewState: GraphViewState;

}

  allNodes: Map<string, ExtendedGraphNode>;

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({

  viewState,  onNavigateHome: () => void;

  allNodes,

  onNavigateHome,  onSelectUniversity: (universityId: string) => void;interface BreadcrumbsProps {import { GraphViewState, ExtendedGraphNode, generateBreadcrumbs, getConnectedMajorIds } from '@/lib/graph-utils';import { partnerUniversities, arcadiaMajors } from '@/data/engineering-paths';

  onSelectUniversity,

  onSelectMajor,  onSelectMajor: (majorId: string, universityId?: string) => void;

  onSwitchUniversity

}) => {  onSwitchUniversity: (newUniversityId: string, currentMajorId?: string) => void;  viewState: GraphViewState;

  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);

  const [showMajorDropdown, setShowMajorDropdown] = useState(false);}



  const breadcrumbs = generateBreadcrumbs(viewState, allNodes);  allNodes: Map<string, ExtendedGraphNode>;import { GraphViewState, ExtendedGraphNode, generateBreadcrumbs, getConnectedMajorIds } from '@/lib/graph-utils';



  const handleUniversitySwitch = (newUniversityId: string) => {const Breadcrumbs: React.FC<BreadcrumbsProps> = ({

    onSwitchUniversity(newUniversityId, viewState.selectedMajorId || undefined);

    setShowUniversityDropdown(false);  viewState,  onNavigateHome: () => void;

  };

  allNodes,

  const handleMajorSwitch = (majorId: string) => {

    onSelectMajor(majorId, viewState.selectedUniversityId || undefined);  onNavigateHome,  onSelectUniversity: (universityId: string) => void;interface BreadcrumbsProps {

    setShowMajorDropdown(false);

  };  onSelectUniversity,



  const getAvailableMajorsForUniversity = (universityId: string) => {  onSelectMajor,  onSelectMajor: (majorId: string, universityId?: string) => void;

    const connectedMajorIds = getConnectedMajorIds(universityId, allNodes);

    return arcadiaMajors.filter(major => connectedMajorIds.includes(major.id));  onSwitchUniversity

  };

}) => {  onSwitchUniversity: (newUniversityId: string, currentMajorId?: string) => void;  viewState: GraphViewState;interface BreadcrumbsProps {

  return (

    <nav className="px-6 py-3 bg-gray-800 border-b border-gray-700">  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);

      <div className="flex items-center space-x-2 text-sm">

        {breadcrumbs.map((item, index) => (  const [showMajorDropdown, setShowMajorDropdown] = useState(false);}

          <React.Fragment key={item.id}>

            {index > 0 && <span className="text-gray-500">/</span>}

            

            {item.type === 'home' && (  const breadcrumbs = generateBreadcrumbs(viewState, allNodes);  allNodes: Map<string, ExtendedGraphNode>;  viewState: GraphViewState;

              <button

                onClick={onNavigateHome}

                className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors"

              >  const handleUniversitySwitch = (newUniversityId: string) => {const Breadcrumbs: React.FC<BreadcrumbsProps> = ({

                {item.name}

              </button>    onSwitchUniversity(newUniversityId, viewState.selectedMajorId || undefined);

            )}

    setShowUniversityDropdown(false);  viewState,  onNavigateHome: () => void;  allNodes: Map<string, ExtendedGraphNode>;

            {item.type === 'university' && (

              <div className="relative">  };

                <button

                  onClick={() => setShowUniversityDropdown(!showUniversityDropdown)}  allNodes,

                  className="text-teal-400 hover:text-teal-300 cursor-pointer transition-colors flex items-center gap-1"

                >  const handleMajorSwitch = (majorId: string) => {

                  {item.name}

                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">    onSelectMajor(majorId, viewState.selectedUniversityId || undefined);  onNavigateHome,  onSelectUniversity: (universityId: string) => void;  onNavigateHome: () => void;

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />

                  </svg>    setShowMajorDropdown(false);

                </button>

                  };  onSelectUniversity,

                {showUniversityDropdown && (

                  <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50 min-w-48">

                    <div className="py-1">

                      {partnerUniversities.map((uni) => (  const getAvailableMajorsForUniversity = (universityId: string) => {  onSelectMajor,  onSelectMajor: (majorId: string, universityId?: string) => void;  onSelectUniversity: (universityId: string) => void;

                        <button

                          key={uni.id}    const connectedMajorIds = getConnectedMajorIds(universityId, allNodes);

                          onClick={() => handleUniversitySwitch(uni.id)}

                          className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition-colors ${    return arcadiaMajors.filter(major => connectedMajorIds.includes(major.id));  onSwitchUniversity

                            uni.id === viewState.selectedUniversityId 

                              ? 'text-teal-300 bg-gray-600'   };

                              : 'text-gray-200'

                          }`}}) => {  onSwitchUniversity: (newUniversityId: string, currentMajorId?: string) => void;  onSelectMajor: (majorId: string, universityId?: string) => void;

                        >

                          {uni.name}  return (

                        </button>

                      ))}    <nav className="px-6 py-3 bg-gray-800 border-b border-gray-700">  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);

                    </div>

                  </div>      <div className="flex items-center space-x-2 text-sm">

                )}

              </div>        {breadcrumbs.map((item, index) => (  const [showMajorDropdown, setShowMajorDropdown] = useState(false);}  onSwitchUniversity: (newUniversityId: string, currentMajorId?: string) => void;

            )}

          <React.Fragment key={item.id}>

            {item.type === 'major' && viewState.selectedUniversityId && (

              <div className="relative">            {index > 0 && <span className="text-gray-500">/</span>}

                <button

                  onClick={() => setShowMajorDropdown(!showMajorDropdown)}            

                  className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors flex items-center gap-1"

                >            {item.type === 'home' && (  const breadcrumbs = generateBreadcrumbs(viewState, allNodes);}

                  {item.name}

                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">              <button

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />

                  </svg>                onClick={onNavigateHome}

                </button>

                                className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors"

                {showMajorDropdown && (

                  <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50 min-w-48">              >  const handleUniversitySwitch = (newUniversityId: string) => {const Breadcrumbs: React.FC<BreadcrumbsProps> = ({

                    <div className="py-1">

                      {getAvailableMajorsForUniversity(viewState.selectedUniversityId).map((major) => (                {item.name}

                        <button

                          key={major.id}              </button>    onSwitchUniversity(newUniversityId, viewState.selectedMajorId || undefined);

                          onClick={() => handleMajorSwitch(major.id)}

                          className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition-colors ${            )}

                            major.id === viewState.selectedMajorId 

                              ? 'text-cyan-300 bg-gray-600'     setShowUniversityDropdown(false);  viewState,const Breadcrumbs: React.FC<BreadcrumbsProps> = ({

                              : 'text-gray-200'

                          }`}            {item.type === 'university' && (

                        >

                          {major.name}              <div className="relative">  };

                        </button>

                      ))}                <button

                    </div>

                  </div>                  onClick={() => setShowUniversityDropdown(!showUniversityDropdown)}  allNodes,  viewState,

                )}

              </div>                  className="text-teal-400 hover:text-teal-300 cursor-pointer transition-colors flex items-center gap-1"

            )}

          </React.Fragment>                >  const handleMajorSwitch = (majorId: string) => {

        ))}

      </div>                  {item.name}



      {(showUniversityDropdown || showMajorDropdown) && (                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">    onSelectMajor(majorId, viewState.selectedUniversityId || undefined);  onNavigateHome,  allNodes,

        <div

          className="fixed inset-0 z-40"                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />

          onClick={() => {

            setShowUniversityDropdown(false);                  </svg>    setShowMajorDropdown(false);

            setShowMajorDropdown(false);

          }}                </button>

        />

      )}                  };  onSelectUniversity,  onNavigateHome,

    </nav>

  );                {showUniversityDropdown && (

};

                  <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50 min-w-48">

export default Breadcrumbs;
                    <div className="py-1">

                      {partnerUniversities.map((uni) => (  const getAvailableMajorsForUniversity = (universityId: string) => {  onSelectMajor,  onSelectUniversity,

                        <button

                          key={uni.id}    const connectedMajorIds = getConnectedMajorIds(universityId, allNodes);

                          onClick={() => handleUniversitySwitch(uni.id)}

                          className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition-colors ${    return arcadiaMajors.filter(major => connectedMajorIds.includes(major.id));  onSwitchUniversity  onSelectMajor,

                            uni.id === viewState.selectedUniversityId 

                              ? 'text-teal-300 bg-gray-600'   };

                              : 'text-gray-200'

                          }`}}) => {  onSwitchUniversity

                        >

                          {uni.name}  return (

                        </button>

                      ))}    <nav className="px-6 py-3 bg-gray-800 border-b border-gray-700">  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);}) => {

                    </div>

                  </div>      <div className="flex items-center space-x-2 text-sm">

                )}

              </div>        {breadcrumbs.map((item, index) => (  const [showMajorDropdown, setShowMajorDropdown] = useState(false);  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);

            )}

          <React.Fragment key={item.id}>

            {item.type === 'major' && viewState.selectedUniversityId && (

              <div className="relative">            {index > 0 && <span className="text-gray-500">/</span>}  const [showMajorDropdown, setShowMajorDropdown] = useState(false);

                <button

                  onClick={() => setShowMajorDropdown(!showMajorDropdown)}            

                  className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors flex items-center gap-1"

                >            {item.type === 'home' && (  const breadcrumbs = generateBreadcrumbs(viewState, allNodes);

                  {item.name}

                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">              <button

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />

                  </svg>                onClick={onNavigateHome}  const breadcrumbs = generateBreadcrumbs(viewState, allNodes);

                </button>

                                className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors"

                {showMajorDropdown && (

                  <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50 min-w-48">              >  const handleUniversitySwitch = (newUniversityId: string) => {

                    <div className="py-1">

                      {getAvailableMajorsForUniversity(viewState.selectedUniversityId).map((major) => (                {item.name}

                        <button

                          key={major.id}              </button>    onSwitchUniversity(newUniversityId, viewState.selectedMajorId || undefined);  const handleUniversitySwitch = (newUniversityId: string) => {

                          onClick={() => handleMajorSwitch(major.id)}

                          className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition-colors ${            )}

                            major.id === viewState.selectedMajorId 

                              ? 'text-cyan-300 bg-gray-600'     setShowUniversityDropdown(false);    onSwitchUniversity(newUniversityId, viewState.selectedMajorId || undefined);

                              : 'text-gray-200'

                          }`}            {item.type === 'university' && (

                        >

                          {major.name}              <div className="relative">  };    setShowUniversityDropdown(false);

                        </button>

                      ))}                <button

                    </div>

                  </div>                  onClick={() => setShowUniversityDropdown(!showUniversityDropdown)}  };

                )}

              </div>                  className="text-teal-400 hover:text-teal-300 cursor-pointer transition-colors flex items-center gap-1"

            )}

          </React.Fragment>                >  const handleMajorSwitch = (majorId: string) => {

        ))}

      </div>                  {item.name}



      {/* Click outside handler */}                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">    onSelectMajor(majorId, viewState.selectedUniversityId || undefined);  const handleMajorSwitch = (majorId: string) => {

      {(showUniversityDropdown || showMajorDropdown) && (

        <div                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />

          className="fixed inset-0 z-40"

          onClick={() => {                  </svg>    setShowMajorDropdown(false);    onSelectMajor(majorId, viewState.selectedUniversityId || undefined);

            setShowUniversityDropdown(false);

            setShowMajorDropdown(false);                </button>

          }}

        />                  };    setShowMajorDropdown(false);

      )}

    </nav>                {showUniversityDropdown && (

  );

};                  <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50 min-w-48">  };



export default Breadcrumbs;                    <div className="py-1">

                      {partnerUniversities.map((uni) => (  const getAvailableMajorsForUniversity = (universityId: string) => {

                        <button

                          key={uni.id}    const connectedMajorIds = getConnectedMajorIds(universityId, allNodes);  const getAvailableMajorsForUniversity = (universityId: string) => {

                          onClick={() => handleUniversitySwitch(uni.id)}

                          className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition-colors ${    return arcadiaMajors.filter(major => connectedMajorIds.includes(major.id));    const connectedMajorIds = getConnectedMajorIds(universityId, allNodes);

                            uni.id === viewState.selectedUniversityId 

                              ? 'text-teal-300 bg-gray-600'   };    return arcadiaMajors.filter(major => connectedMajorIds.includes(major.id));

                              : 'text-gray-200'

                          }`}  };

                        >

                          {uni.name}  return (

                        </button>

                      ))}    <nav className="px-6 py-3 bg-gray-800 border-b border-gray-700">  return (

                    </div>

                  </div>      <div className="flex items-center space-x-2 text-sm">    <nav className="px-6 py-3 bg-gray-800 border-b border-gray-700">

                )}

              </div>        {breadcrumbs.map((item, index) => (      <div className="flex items-center space-x-2 text-sm">

            )}

          <React.Fragment key={item.id}>        {breadcrumbs.map((item, index) => (

            {item.type === 'major' && viewState.selectedUniversityId && (

              <div className="relative">            {index > 0 && <span className="text-gray-500">/</span>}          <React.Fragment key={item.id}>

                <button

                  onClick={() => setShowMajorDropdown(!showMajorDropdown)}                        {index > 0 && <span className="text-gray-500">/</span>}

                  className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors flex items-center gap-1"

                >            {item.type === 'home' && (            

                  {item.name}

                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">              <button            {item.type === 'home' && (

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />

                  </svg>                onClick={onNavigateHome}              <button

                </button>

                                className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors"                onClick={onNavigateHome}

                {showMajorDropdown && (

                  <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50 min-w-48">              >                className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors"

                    <div className="py-1">

                      {getAvailableMajorsForUniversity(viewState.selectedUniversityId).map((major) => (                {item.name}              >

                        <button

                          key={major.id}              </button>                {item.name}

                          onClick={() => handleMajorSwitch(major.id)}

                          className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition-colors ${            )}              </button>

                            major.id === viewState.selectedMajorId 

                              ? 'text-cyan-300 bg-gray-600'             )}

                              : 'text-gray-200'

                          }`}            {item.type === 'university' && (

                        >

                          {major.name}              <div className="relative">            {item.type === 'university' && (

                        </button>

                      ))}                <button              <div className="relative">

                    </div>

                  </div>                  onClick={() => setShowUniversityDropdown(!showUniversityDropdown)}                <button

                )}

              </div>                  className="text-teal-400 hover:text-teal-300 cursor-pointer transition-colors flex items-center gap-1"                  onClick={() => setShowUniversityDropdown(!showUniversityDropdown)}

            )}

          </React.Fragment>                >                  className="text-teal-400 hover:text-teal-300 cursor-pointer transition-colors flex items-center gap-1"

        ))}

      </div>                  {item.name}                >



      {/* Click outside handler */}                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">                  {item.name}

      {(showUniversityDropdown || showMajorDropdown) && (

        <div                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">

          className="fixed inset-0 z-40"

          onClick={() => {                  </svg>                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />

            setShowUniversityDropdown(false);

            setShowMajorDropdown(false);                </button>                  </svg>

          }}

        />                                </button>

      )}

    </nav>                {showUniversityDropdown && (                

  );

};                  <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50 min-w-48">                {showUniversityDropdown && (



export default Breadcrumbs;                    <div className="py-1">                  <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50 min-w-48">

                      {partnerUniversities.map((uni) => (                    <div className="py-1">

                        <button                      {partnerUniversities.map((uni) => (

                          key={uni.id}                        <button

                          onClick={() => handleUniversitySwitch(uni.id)}                          key={uni.id}

                          className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition-colors ${                          onClick={() => handleUniversitySwitch(uni.id)}

                            uni.id === viewState.selectedUniversityId                           className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition-colors ${

                              ? 'text-teal-300 bg-gray-600'                             uni.id === viewState.selectedUniversityId 

                              : 'text-gray-200'                              ? 'text-teal-300 bg-gray-600' 

                          }`}                              : 'text-gray-200'

                        >                          }`}

                          {uni.name}                        >

                        </button>                          {uni.name}

                      ))}                        </button>

                    </div>                      ))}

                  </div>                    </div>

                )}                  </div>

              </div>                )}

            )}              </div>

            )}

            {item.type === 'major' && viewState.selectedUniversityId && (

              <div className="relative">            {item.type === 'major' && viewState.selectedUniversityId && (

                <button              <div className="relative">

                  onClick={() => setShowMajorDropdown(!showMajorDropdown)}                <button

                  className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors flex items-center gap-1"                  onClick={() => setShowMajorDropdown(!showMajorDropdown)}

                >                  className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors flex items-center gap-1"

                  {item.name}                >

                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">                  {item.name}

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                  </svg>                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />

                </button>                  </svg>

                                </button>

                {showMajorDropdown && (                

                  <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50 min-w-48">                {showMajorDropdown && (

                    <div className="py-1">                  <div className="absolute top-full left-0 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50 min-w-48">

                      {getAvailableMajorsForUniversity(viewState.selectedUniversityId).map((major) => (                    <div className="py-1">

                        <button                      {getAvailableMajorsForUniversity(viewState.selectedUniversityId).map((major) => (

                          key={major.id}                        <button

                          onClick={() => handleMajorSwitch(major.id)}                          key={major.id}

                          className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition-colors ${                          onClick={() => handleMajorSwitch(major.id)}

                            major.id === viewState.selectedMajorId                           className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-600 transition-colors ${

                              ? 'text-cyan-300 bg-gray-600'                             major.id === viewState.selectedMajorId 

                              : 'text-gray-200'                              ? 'text-cyan-300 bg-gray-600' 

                          }`}                              : 'text-gray-200'

                        >                          }`}

                          {major.name}                        >

                        </button>                          {major.name}

                      ))}                        </button>

                    </div>                      ))}

                  </div>                    </div>

                )}                  </div>

              </div>                )}

            )}              </div>

          </React.Fragment>            )}

        ))}          </React.Fragment>

      </div>        ))}

      </div>

      {/* Click outside handler */}

      {(showUniversityDropdown || showMajorDropdown) && (      {/* Click outside handler */}

        <div      {(showUniversityDropdown || showMajorDropdown) && (

          className="fixed inset-0 z-40"        <div

          onClick={() => {          className="fixed inset-0 z-40"

            setShowUniversityDropdown(false);          onClick={() => {

            setShowMajorDropdown(false);            setShowUniversityDropdown(false);

          }}            setShowMajorDropdown(false);

        />          }}

      )}        />

    </nav>      )}

  );    </nav>

};  );

};

export default Breadcrumbs;
export default Breadcrumbs;

    switch (selectedNode.type) {
      case 'major':
        path.push(
          <span key="separator1" className="text-gray-500 mx-2">/</span>,
          <div key="major-dropdown" className="relative inline-block">
            <button
              className="text-cyan-400 hover:text-cyan-300 cursor-pointer flex items-center"
              onClick={() => setShowMajorDropdown(!showMajorDropdown)}
            >
              {selectedNode.name}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showMajorDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-gray-700 rounded-lg shadow-lg z-10 min-w-48">
                {arcadiaMajors.filter(major => 
                  ['mathematics', 'computer-science', 'chemistry'].includes(major.id)
                ).map(major => (
                  <button
                    key={major.id}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => {
                      onNodeSelect?.(createNodeFromData(major, 'major'));
                      setShowMajorDropdown(false);
                    }}
                  >
                    {major.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
        break;
      case 'university':
        path.push(
          <span key="separator1" className="text-gray-500 mx-2">/</span>,
          <div key="university-dropdown" className="relative inline-block">
            <button
              className="text-teal-400 hover:text-teal-300 cursor-pointer flex items-center"
              onClick={() => setShowUniversityDropdown(!showUniversityDropdown)}
            >
              {selectedNode.name}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showUniversityDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-gray-700 rounded-lg shadow-lg z-10 min-w-64">
                {partnerUniversities.map(university => (
                  <button
                    key={university.id}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => {
                      // Check if current major exists in new university
                      let targetNode = createNodeFromData(university, 'university');
                      
                      // If there's a selected major, try to find it in the new university
                      if (selectedNode?.type === 'major') {
                        const currentMajorId = selectedNode.id;
                        const hasMatchingProgram = university.programs.some(program => 
                          program.arcadiaMajorIds.includes(currentMajorId)
                        );
                        
                        if (hasMatchingProgram) {
                          // Keep the same major selected for the new university
                          targetNode = selectedNode;
                        }
                      }
                      
                      onNodeSelect?.(targetNode);
                      setShowUniversityDropdown(false);
                    }}
                  >
                    {university.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
        break;
      case 'program':
        const university = partnerUniversities.find(uni => uni.id === selectedNode.universityId);
        if (university) {
          path.push(
            <span key="separator1" className="text-gray-500 mx-2">/</span>,
            <button 
              key={university.id} 
              className="text-teal-400 hover:text-teal-300 cursor-pointer"
              onClick={() => onNodeSelect?.(createNodeFromData(university, 'university'))}
            >
              {university.name}
            </button>
          );
        }
        path.push(
          <span key="separator2" className="text-gray-500 mx-2">/</span>,
          <span key={selectedNode.id} className="text-indigo-400">{selectedNode.name}</span>
        );
        break;
    }

    return path;
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowUniversityDropdown(false);
      setShowMajorDropdown(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="p-4 bg-gray-900">
      <div className="flex items-center flex-wrap">
        {getPath().map((item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;

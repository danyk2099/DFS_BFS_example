// Search Library
const SearchAlgorithms = (function(){
    const TraversalFindStatusEnum = {
        Found: 'found',
        NotFoundYet: 'notFoundYet',
        NotFound: 'notFound'
    };

    function getDFSPath(objTree, searchItem) {
        let objTraversalPath = [];
        let searchStatus = TraversalFindStatusEnum.NotFoundYet; // Correlates to TraversalFindStatusEnum

        function traverseDFSPath(objTree, searchItem) {
            const objTreeKeys = Object.keys(objTree);
            const objTreeKeysLength = objTreeKeys.length;

            for(let i = 0; i < objTreeKeysLength; i++) {
                const objKey = objTreeKeys[i]
                const childObject = objTree[objKey];

                objTraversalPath.push(objKey);
                searchStatus = (objTraversalPath.includes(searchItem)) ? TraversalFindStatusEnum.Found : TraversalFindStatusEnum.NotFoundYet;

                if (searchStatus === TraversalFindStatusEnum.Found) { break; }

                if(!childObject) {
                    objTraversalPath.pop();
                    searchStatus = TraversalFindStatusEnum.NotFound;
                } else {
                    traverseDFSPath(childObject, searchItem);

                    if (searchStatus === TraversalFindStatusEnum.NotFound) {
                        objTraversalPath = [];
                        return;
                    }

                    if (searchStatus === TraversalFindStatusEnum.Found) {
                        return;
                    }
                }
            }
        }

        traverseDFSPath(objTree, searchItem);
        return objTraversalPath;
    }

    return {getDFSPath};
}());


// Search Usage
(function(){

    const tree = {
        '1': {
            '2': {
                '7': null,
                '8': {
                    '10': null
                },
                '9': null
            },
            '3': null,
            '4': null,
            '5': null,
            '6': null
        }
    };

    let numToSearch = document.getElementById('num-to-search');
    let searchDfsBtn = document.getElementById('search-dfs-btn');
    let searchResult = document.getElementById('search-result');

    function attachEvents() {
        searchDfsBtn.addEventListener('click', () => {
            displayDFSPath(numToSearch.value);
        });
    }

    function displayDFSPath(keyToSearch = '0') {
        keyToSearch = keyToSearch.toString(); // Make sure that numeric key can be cast to string
        const dfsSearchPath = SearchAlgorithms.getDFSPath(tree, keyToSearch);
        const displayedResult = (dfsSearchPath.length > 0) ?`Resolves to: ${dfsSearchPath}` : `NOT FOUND`;

        searchResult.innerText = displayedResult;

        console.log(`
        -------------- DFS ---------------
        Full path to: ${keyToSearch}
        ${displayedResult}
        `);
    }

    attachEvents();
}());


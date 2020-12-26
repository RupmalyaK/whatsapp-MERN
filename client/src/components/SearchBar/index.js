import "./style.scss";
import React, {useEffect,useState} from "react";
import {useTheme} from "@material-ui/core";
import {motion, useAnimation} from "framer-motion";
import {ArrowDownward,Search as SearchIcon} from "@material-ui/icons";

const SearchBar = ({searchInput,setSearchInput,placeHolder}) => {
    const [isSearchFocus, setIsSearchFocus] = useState(false);
    
    const arrowController = useAnimation();
    const inputController = useAnimation();
    const theme = useTheme();

    const {background,icon} = theme.palette;
  useEffect(() => {
    if (isSearchFocus) {
      rotateArrow90();
    }
  }, [isSearchFocus]);

  const rotateArrow90 = async () => {
    inputController.start({ width: "100%", height: "95%",borderRadius:"0px" });
    await arrowController.start({ rotate: 90 });
  };

  const resetArrow = async () => {
    inputController.start({ height: "70%", width: "95%",borderRadius:"18px" });
    return await arrowController.start({
      rotate: 0,
      opacity: 0.5,
      transition: { duration: 0.2 },
    });
  };

    return ( <div
        className="sidebar__search-input-wrapper"
        style={{ background: background.searchContainerBackground }}
      >
        {isSearchFocus ? (
          <motion.span
            animate={arrowController}
            className="sidebar__search-input-wrapper__iconWrapper"
          >
            <ArrowDownward
              className="sidebar__search-input-wrapper__arrow"
              style={{ color: icon.arrowIconColor, cursor: "pointer" }}
              onClick={async (e) => {
                await resetArrow();
                setSearchInput("");
                setIsSearchFocus(false);
              }}
            />
          </motion.span>
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="sidebar__search-input-wrapper__iconWrapper"
          >
            <SearchIcon
              style={{ color: icon.iconColor, cursor: "pointer" }}
            />
          </motion.span>
        )}
        <motion.input
          className="sidebar__search-input"
          style={{ background: background.searchInputBackground }}
          placeholder={!isSearchFocus ? placeHolder : ""}
          value={searchInput}
          onFocus={(e) => setIsSearchFocus(true)}
          onChange={(e) => setSearchInput(e.target.value)}
          animate={inputController}
          onBlur={async (e) => {
            if (!searchInput) {
              await resetArrow();
              setIsSearchFocus(false);
            }
          }}
        ></motion.input>
      </div>);
}

export default SearchBar;
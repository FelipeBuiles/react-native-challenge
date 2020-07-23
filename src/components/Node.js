import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../constants/colors";
import { Paper, Subtitle, BodyText, Caption } from "material-bread";
import { Expander } from "./Expander";
import Status from "./Status";
import Blocks from "./Blocks";
import { fetchNodeBlocks } from "../actions/nodes";

const Node = ({ node, expanded, toggleNodeExpanded }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNodeBlocks(node));
  }, []);

  return (
    <TouchableOpacity onPress={() => toggleNodeExpanded(node)}>
      <Paper elevation={2} style={styles.container}>
        <View style={styles.headingContainer}>
          <Subtitle
            type={6}
            text={node.name || "Unknown"}
            style={styles.heading}
          />
          <Status loading={node.loading} online={node.online} />
        </View>
        <Caption
          text={node.url}
          color={colors.gray}
          style={styles.secondaryHeading}
        />
        <Expander expanded={expanded} style={styles.icon(expanded)} />
        {expanded && (
          <View style={styles.heading}>
            <Blocks blocks={node.blocks.data} loading={node.blocks.loading} error={node.blocks.error} />
          </View>
        )}
      </Paper>
    </TouchableOpacity>
  );
};

export const BlockDataType = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.string,
  attributes: PropTypes.shape({
    index: PropTypes.number,
    timestamp: PropTypes.number,
    data: PropTypes.string,
    "previous-hash": PropTypes.string,
    hash: PropTypes.string
  })
});

export const BlocksListDataType = PropTypes.arrayOf(BlockDataType);

Node.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool,
    blocks: PropTypes.shape({
      data: BlocksListDataType,
      loading: PropTypes.bool,
      error: PropTypes.bool
    })
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 30
  },
  heading: {
    marginTop: 5,
    color: colors.text
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingEnd: 30,
    alignItems: "center",
    width: "100%"
  },
  secondaryHeading: {
    marginTop: 5,
    color: colors.faded
  },
  icon: expanded => ({
    position: "absolute",
    top: expanded ? 10 : 20,
    right: 10
  })
});

export default Node;

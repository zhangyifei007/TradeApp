import { connect } from 'react-redux';

export default function reduxify(
  mapStateToProps: any,
  mapDispatchToProps?: any,
  mergeProps?: any,
  options?: any
) {
  return (target: any) =>
    connect(
      mapStateToProps,
      mapDispatchToProps,
      mergeProps,
      options
    )(target) as any;
}
